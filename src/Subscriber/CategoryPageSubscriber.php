<?php

namespace Faq\Subscriber;

use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Storefront\Page\GenericPageLoadedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Shopware\Core\Framework\Struct\ArrayEntity;

class CategoryPageSubscriber implements EventSubscriberInterface
{
    private EntityRepository $manufacturerRepository;

    public function __construct(EntityRepository $manufacturerRepository)
    {
        $this->manufacturerRepository = $manufacturerRepository;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            GenericPageLoadedEvent::class => 'onCategoryPageLoaded'
        ];
    }

    public function onCategoryPageLoaded(GenericPageLoadedEvent $event): void
    {
        $context = $event->getContext();
        $criteria = new Criteria();
        
        // Get manufacturers
        $manufacturers = $this->manufacturerRepository->search($criteria, $context);

        
        // Create an ArrayEntity with the manufacturers
        $manufacturerExtension = new ArrayEntity([
            'manufacturers' => $manufacturers->getElements()
        ]);
        
        // Add the extension to the page
        $event->getPage()->addExtension('manufacturers', $manufacturerExtension);
    }
}